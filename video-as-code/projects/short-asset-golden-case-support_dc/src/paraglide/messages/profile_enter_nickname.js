/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Profile_Enter_NicknameInputs */

const en_profile_enter_nickname = /** @type {(inputs: Profile_Enter_NicknameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enter your nickname`)
};

const zh_profile_enter_nickname = /** @type {(inputs: Profile_Enter_NicknameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入您的昵称`)
};

/**
* | output |
* | --- |
* | "Enter your nickname" |
*
* @param {Profile_Enter_NicknameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_enter_nickname = /** @type {((inputs?: Profile_Enter_NicknameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Enter_NicknameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_profile_enter_nickname(inputs)
	return zh_profile_enter_nickname(inputs)
});