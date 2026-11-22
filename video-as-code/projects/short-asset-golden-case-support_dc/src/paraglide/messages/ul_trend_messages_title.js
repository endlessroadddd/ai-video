/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Trend_Messages_TitleInputs */

const en_ul_trend_messages_title = /** @type {(inputs: Ul_Trend_Messages_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`30-Day Message Trend`)
};

const zh_ul_trend_messages_title = /** @type {(inputs: Ul_Trend_Messages_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`30 天消息趋势`)
};

/**
* | output |
* | --- |
* | "30-Day Message Trend" |
*
* @param {Ul_Trend_Messages_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_trend_messages_title = /** @type {((inputs?: Ul_Trend_Messages_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Trend_Messages_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_trend_messages_title(inputs)
	return zh_ul_trend_messages_title(inputs)
});