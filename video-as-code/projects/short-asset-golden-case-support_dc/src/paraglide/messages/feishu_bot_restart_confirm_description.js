/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Restart_Confirm_DescriptionInputs */

const en_feishu_bot_restart_confirm_description = /** @type {(inputs: Feishu_Bot_Restart_Confirm_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The connection will be restarted to recover runtime state.`)
};

const zh_feishu_bot_restart_confirm_description = /** @type {(inputs: Feishu_Bot_Restart_Confirm_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`会重建连接，用于恢复当前运行状态。`)
};

/**
* | output |
* | --- |
* | "The connection will be restarted to recover runtime state." |
*
* @param {Feishu_Bot_Restart_Confirm_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_restart_confirm_description = /** @type {((inputs?: Feishu_Bot_Restart_Confirm_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Restart_Confirm_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_restart_confirm_description(inputs)
	return zh_feishu_bot_restart_confirm_description(inputs)
});