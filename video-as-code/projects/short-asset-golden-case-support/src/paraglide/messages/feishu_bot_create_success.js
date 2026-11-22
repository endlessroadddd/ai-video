/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Create_SuccessInputs */

const en_feishu_bot_create_success = /** @type {(inputs: Feishu_Bot_Create_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu bot created.`)
};

const zh_feishu_bot_create_success = /** @type {(inputs: Feishu_Bot_Create_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu Bot 已创建。`)
};

/**
* | output |
* | --- |
* | "Feishu bot created." |
*
* @param {Feishu_Bot_Create_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_create_success = /** @type {((inputs?: Feishu_Bot_Create_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Create_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_create_success(inputs)
	return zh_feishu_bot_create_success(inputs)
});