/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Slack_Channel_GroupInputs */

const en_slack_channel_group = /** @type {(inputs: Slack_Channel_GroupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Group`)
};

const zh_slack_channel_group = /** @type {(inputs: Slack_Channel_GroupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`群组`)
};

/**
* | output |
* | --- |
* | "Group" |
*
* @param {Slack_Channel_GroupInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const slack_channel_group = /** @type {((inputs?: Slack_Channel_GroupInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Slack_Channel_GroupInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_slack_channel_group(inputs)
	return zh_slack_channel_group(inputs)
});