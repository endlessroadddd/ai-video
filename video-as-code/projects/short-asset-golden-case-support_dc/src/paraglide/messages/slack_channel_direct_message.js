/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Slack_Channel_Direct_MessageInputs */

const en_slack_channel_direct_message = /** @type {(inputs: Slack_Channel_Direct_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Direct Message`)
};

const zh_slack_channel_direct_message = /** @type {(inputs: Slack_Channel_Direct_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`私聊`)
};

/**
* | output |
* | --- |
* | "Direct Message" |
*
* @param {Slack_Channel_Direct_MessageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const slack_channel_direct_message = /** @type {((inputs?: Slack_Channel_Direct_MessageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Slack_Channel_Direct_MessageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_slack_channel_direct_message(inputs)
	return zh_slack_channel_direct_message(inputs)
});