import { prop, getModelForClass } from "@typegoose/typegoose";
import { Document } from "mongoose";

export interface IQuestion extends Document {
  topic: string;
  problem: string;
  done?: boolean;
  bookmark?: boolean;
  notes?: string;
  attempts?: number;
  url1?: string;
  url2?: string;
  url3?: string;
}

export class Question {
  @prop({
    required: [
      true,
      "Please provide the name of the topic to which this question belongs.",
    ],
    enum: [
      "Array",
      "Matrix",
      "String",
      "Search & Sort",
      "Linked List",
      "Binary Trees",
      "BST",
      "Greedy",
      "BackTracking",
      "Stacks & Queues",
      "Heap",
      "Graph",
      "Trie",
      "Dynamic Programming",
      "Bit Manipulation",
    ],
  })
  topic!: string;

  @prop({
    required: [true, "Please provide the name of the question."],
  })
  problem!: string;

  @prop({ default: false })
  done?: boolean;

  @prop({ default: false })
  bookmark?: boolean;

  @prop()
  notes?: string;

  @prop({ default: 0 })
  attempts?: number;

  @prop({})
  url2?: string;

  @prop({})
  url3?: string;

  @prop({ required: [true, "Please provide the url of the question."] })
  url1!: string;
}

export type QuestionDocument = Question & Document;

export const QuestionModel = getModelForClass(Question);
