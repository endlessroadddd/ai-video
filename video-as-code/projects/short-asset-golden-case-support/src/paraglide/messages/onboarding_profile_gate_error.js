/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Onboarding_Profile_Gate_ErrorInputs */

const en_onboarding_profile_gate_error = /** @type {(inputs: Onboarding_Profile_Gate_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load onboarding progress. Please try again later.`)
};

const zh_onboarding_profile_gate_error = /** @type {(inputs: Onboarding_Profile_Gate_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取 onboarding 进度失败，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "Failed to load onboarding progress. Please try again later." |
*
* @param {Onboarding_Profile_Gate_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_profile_gate_error = /** @type {((inputs?: Onboarding_Profile_Gate_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Profile_Gate_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_onboarding_profile_gate_error(inputs)
	return zh_onboarding_profile_gate_error(inputs)
});