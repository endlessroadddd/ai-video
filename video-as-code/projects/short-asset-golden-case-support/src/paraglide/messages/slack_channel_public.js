/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Slack_Channel_PublicInputs */

const en_slack_channel_public = /** @type {(inputs: Slack_Channel_PublicInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Public`)
};

const zh_slack_channel_public = /** @type {(inputs: Slack_Channel_PublicInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公开频道`)
};

/**
* | output |
* | --- |
* | "Public" |
*
* @param {Slack_Channel_PublicInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const slack_channel_public = /** @type {((inputs?: Slack_Channel_PublicInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Slack_Channel_PublicInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_slack_channel_public(inputs)
	return zh_slack_channel_public(inputs)
});