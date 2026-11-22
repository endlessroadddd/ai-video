/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Platform_SlackInputs */

const en_platform_slack = /** @type {(inputs: Platform_SlackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Slack`)
};

const zh_platform_slack = /** @type {(inputs: Platform_SlackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Slack`)
};

/**
* | output |
* | --- |
* | "Slack" |
*
* @param {Platform_SlackInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const platform_slack = /** @type {((inputs?: Platform_SlackInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Platform_SlackInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_platform_slack(inputs)
	return zh_platform_slack(inputs)
});