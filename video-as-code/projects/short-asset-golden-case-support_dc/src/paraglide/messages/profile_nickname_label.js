/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Profile_Nickname_LabelInputs */

const en_profile_nickname_label = /** @type {(inputs: Profile_Nickname_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nickname`)
};

const zh_profile_nickname_label = /** @type {(inputs: Profile_Nickname_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`昵称`)
};

/**
* | output |
* | --- |
* | "Nickname" |
*
* @param {Profile_Nickname_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_nickname_label = /** @type {((inputs?: Profile_Nickname_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Nickname_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_profile_nickname_label(inputs)
	return zh_profile_nickname_label(inputs)
});