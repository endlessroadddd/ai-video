/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Slack_Channel_Multi_Person_DmInputs */

const en_slack_channel_multi_person_dm = /** @type {(inputs: Slack_Channel_Multi_Person_DmInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Multi Person DM`)
};

const zh_slack_channel_multi_person_dm = /** @type {(inputs: Slack_Channel_Multi_Person_DmInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`多人私聊`)
};

/**
* | output |
* | --- |
* | "Multi Person DM" |
*
* @param {Slack_Channel_Multi_Person_DmInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const slack_channel_multi_person_dm = /** @type {((inputs?: Slack_Channel_Multi_Person_DmInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Slack_Channel_Multi_Person_DmInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_slack_channel_multi_person_dm(inputs)
	return zh_slack_channel_multi_person_dm(inputs)
});