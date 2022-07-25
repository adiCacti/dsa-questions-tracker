import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Document, Schema } from "mongoose";
import { Question } from "./Question";

export interface ITopic extends Document {
  totalQuestions?: number;
  topicName: string;
  position: number;
  started?: boolean;
  doneQuestions?: number;
  questions?: Ref<Question | void | string>[];
}

class Topic {
  @prop()
  _id?: Schema.Types.ObjectId | string;

  @prop({ default: 0 })
  totalQuestions?: number;

  @prop({ required: [true, "Please provide the topic name."] })
  topicName!: string;

  @prop({ required: [true, "Please provide the topic position."] })
  position!: number;

  @prop({ default: false })
  started?: boolean;

  @prop({ default: 0 })
  doneQuestions?: number;

  @prop({ ref: () => Question })
  questions?: Ref<Question>[];
}

export type TopicDocument = Topic & Document;

export const TopicModel = getModelForClass(Topic);
