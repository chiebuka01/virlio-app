import { prop, modelOptions, getModelForClass } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
class Comment {
  @prop({ required: true, type: String })
  videoId: string;

  @prop({ required: true, type: String })
  userId: string;

  @prop({ required: true, type: String })
  text: string;

  @prop({ type: Number, min: 1, max: 5 })
  rating?: number;
}

export default getModelForClass(Comment);
