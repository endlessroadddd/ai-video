/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Slack_Channel_PrivateInputs */

const en_slack_channel_private = /** @type {(inputs: Slack_Channel_PrivateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Private`)
};

const zh_slack_channel_private = /** @type {(inputs: Slack_Channel_PrivateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`私有频道`)
};

/**
* | output |
* | --- |
* | "Private" |
*
* @param {Slack_Channel_PrivateInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const slack_channel_private = /** @type {((inputs?: Slack_Channel_PrivateInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Slack_Channel_PrivateInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_slack_channel_private(inputs)
	return zh_slack_channel_private(inputs)
});