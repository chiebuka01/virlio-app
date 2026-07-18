import { prop, modelOptions, getModelForClass } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
class Video {
  @prop({ required: true, type: String })
  title: string;

  @prop({ trim: true, type: String })
  description: string;

  @prop({ required: true, type: String })
  video: string;

  @prop({ required: true, type: String })
  creatorId: string;

  @prop({ type: String })
  publisher: string;

  @prop({ type: String })
  producer: string;

  @prop({ type: String })
  genre: string;

  @prop({ type: String })
  ageRating: string;
}

export default getModelForClass(Video);
