import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // Defaults to process.env.ANTHROPIC_API_KEY
});

/**
 * Analyzes a proposal against gig requirements using Claude
 * @param {Object} gig - The gig details (title, description, skills)
 * @param {Object} freelancer - Freelancer details (bio, skills)
 * @param {Object} proposal - Proposal details (cover letter)
 * @returns {Object} - { score: number, analysis: string }
 */
export const rankProposal = async (gig, freelancer, proposal) => {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn("ANTHROPIC_API_KEY is not set. Skipping AI ranking.");
    return { score: 0, analysis: "AI matching unavailable." };
  }

  const prompt = `
    You are an expert tech recruiter and AI system for a freelancer marketplace.
    Please evaluate the following freelancer's proposal against the gig requirements.
    
    [GIG DETAILS]
    Title: ${gig.title}
    Description: ${gig.description}
    Required Skills: ${gig.skills_required.join(', ')}

    [FREELANCER PROFILE]
    Bio: ${freelancer.bio || 'Not provided'}
    Declared Skills: ${freelancer.skills.join(', ')}

    [PROPOSAL / COVER LETTER]
    ${proposal.cover_letter}

    Task:
    Provide a unified JSON response matching this schema:
    {
      "score": <number between 0 and 100 representing the fit>,
      "analysis": "<A 2-3 sentence brief explanation of why they are or aren't a good fit>"
    }
    
    Ensure your response is ONLY valid JSON.
  `;

  try {
    const msg = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 300,
      system: "You are a JSON-only API. You must output completely valid JSON and no other text.",
      messages: [{ role: "user", content: prompt }]
    });

    const responseText = msg.content[0].text;
    const result = JSON.parse(responseText);

    return {
      score: result.score || 0,
      analysis: result.analysis || "Analysis failed to parse."
    };
  } catch (error) {
    console.error("AI Ranking Error:", error);
    return { score: 0, analysis: "Error during AI evaluation." };
  }
};
