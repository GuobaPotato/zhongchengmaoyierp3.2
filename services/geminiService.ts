
import { GoogleGenAI, Type } from "@google/genai";
import { InventoryItem, ProductionOrder } from '../types';

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Initializing with process.env.API_KEY directly as per guidelines
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async analyzeSupplyChain(inventory: InventoryItem[], orders: ProductionOrder[]) {
    const prompt = `
      作为感应器制造企业的资深供应链分析师，请根据以下数据分析潜在风险并提供建议：
      
      库存数据：${JSON.stringify(inventory)}
      生产订单：${JSON.stringify(orders)}
      
      请分析：
      1. 是否有库存短缺风险？
      2. 生产调度是否合理？
      3. 对下个月的采购建议。
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      return response.text || "无法生成分析报告。";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "分析过程中发生错误，请检查网络或API配置。";
    }
  }

  async chatWithAssistant(message: string, context: any) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `上下文数据: ${JSON.stringify(context)}\n用户提问: ${message}`,
        config: {
          systemInstruction: "你是一个专业的ERP助手，专注于感应器制造行业。请用专业、简洁的中文回答用户。如果涉及敏感数据，请进行预警。",
          temperature: 0.7
        }
      });
      return response.text || "抱歉，我无法回答。";
    } catch (error) {
      return "对话异常，请稍后再试。";
    }
  }
}

export const geminiService = new GeminiService();
