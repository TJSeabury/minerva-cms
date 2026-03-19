import { TextPrimitive } from "../components/primitives/Text.js";
import { RichTextPrimitive } from "../components/primitives/RichText.js";
import { ImagePrimitive } from "../components/primitives/Image.js";
import { CtaButtonPrimitive } from "../components/primitives/CtaButton.js";
import { NumberPrimitive } from "../components/primitives/Number.js";
export const primitiveRegistry = {
    Text: TextPrimitive,
    RichText: RichTextPrimitive,
    Image: ImagePrimitive,
    CtaButton: CtaButtonPrimitive,
    Number: NumberPrimitive,
};
export function getPrimitive(name) {
    return primitiveRegistry[name];
}
