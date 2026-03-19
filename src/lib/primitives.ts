import { TextPrimitive } from "../components/primitives/Text.js";
import { RichTextPrimitive } from "../components/primitives/RichText.js";
import { ImagePrimitive } from "../components/primitives/Image.js";
import { CtaButtonPrimitive } from "../components/primitives/CtaButton.js";
import { NumberPrimitive } from "../components/primitives/Number.js";
import type { PrimitiveDefinition } from "./primitive-factory.js";

export const primitiveRegistry: Record<
  string,
  PrimitiveDefinition<any, Record<string, unknown>>
> = {
  Text: TextPrimitive,
  RichText: RichTextPrimitive,
  Image: ImagePrimitive,
  CtaButton: CtaButtonPrimitive,
  Number: NumberPrimitive,
};

export type PrimitiveName = keyof typeof primitiveRegistry;

export function getPrimitive(name: PrimitiveName) {
  return primitiveRegistry[name];
}

