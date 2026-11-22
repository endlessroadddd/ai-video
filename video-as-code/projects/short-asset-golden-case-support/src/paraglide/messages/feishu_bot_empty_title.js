/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Empty_TitleInputs */

const en_feishu_bot_empty_title = /** @type {(inputs: Feishu_Bot_Empty_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No Feishu bots yet`)
};

const zh_feishu_bot_empty_title = /** @type {(inputs: Feishu_Bot_Empty_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前还没有 Feishu Bot`)
};

/**
* | output |
* | --- |
* | "No Feishu bots yet" |
*
* @param {Feishu_Bot_Empty_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_empty_title = /** @type {((inputs?: Feishu_Bot_Empty_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Empty_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_empty_title(inputs)
	return zh_feishu_bot_empty_title(inputs)
});