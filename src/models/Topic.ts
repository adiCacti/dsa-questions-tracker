import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Document } from "mongoose";
import { Question } from "./Question";

export interface ITopic extends Document {
  topicName: string;
  position: number;
  started?: boolean;
  doneQuestion?: number;
  question?: Ref<Question>[];
}

class Topic {
  @prop({ required: [true, "Please provide the topic name."] })
  topicName!: string;

  @prop({ required: [true, "Please provide the topic position."] })
  position!: number;

  @prop({ default: false })
  started?: boolean;

  @prop({ default: 0 })
  doneQuestion?: number;

  @prop({ ref: () => Question })
  questions?: Ref<Question>[];
}

export type TopicDocument = Topic & Document;

export const TopicModel = getModelForClass(Topic);
