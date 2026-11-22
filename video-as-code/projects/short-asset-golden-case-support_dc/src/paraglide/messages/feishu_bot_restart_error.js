/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Restart_ErrorInputs */

const en_feishu_bot_restart_error = /** @type {(inputs: Feishu_Bot_Restart_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to restart the Feishu bot.`)
};

const zh_feishu_bot_restart_error = /** @type {(inputs: Feishu_Bot_Restart_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重启 Feishu Bot 失败。`)
};

/**
* | output |
* | --- |
* | "Failed to restart the Feishu bot." |
*
* @param {Feishu_Bot_Restart_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_restart_error = /** @type {((inputs?: Feishu_Bot_Restart_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Restart_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_restart_error(inputs)
	return zh_feishu_bot_restart_error(inputs)
});