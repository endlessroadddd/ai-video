/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Update_SuccessInputs */

const en_feishu_bot_update_success = /** @type {(inputs: Feishu_Bot_Update_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu bot updated.`)
};

const zh_feishu_bot_update_success = /** @type {(inputs: Feishu_Bot_Update_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu Bot 已更新。`)
};

/**
* | output |
* | --- |
* | "Feishu bot updated." |
*
* @param {Feishu_Bot_Update_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_update_success = /** @type {((inputs?: Feishu_Bot_Update_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Update_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_update_success(inputs)
	return zh_feishu_bot_update_success(inputs)
});