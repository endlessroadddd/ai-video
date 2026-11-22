/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ min: NonNullable<unknown>, max: NonNullable<unknown> }} Profile_Nickname_HintInputs */

const en_profile_nickname_hint = /** @type {(inputs: Profile_Nickname_HintInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.min}-${i?.max} characters. Nicknames must be unique within the same workspace.`)
};

const zh_profile_nickname_hint = /** @type {(inputs: Profile_Nickname_HintInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.min}-${i?.max} 个字符，同一工作区昵称不得重复。`)
};

/**
* | output |
* | --- |
* | "{min}-{max} characters. Nicknames must be unique within the same workspace." |
*
* @param {Profile_Nickname_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_nickname_hint = /** @type {((inputs: Profile_Nickname_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Nickname_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_profile_nickname_hint(inputs)
	return zh_profile_nickname_hint(inputs)
});