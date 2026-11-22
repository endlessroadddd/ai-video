/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Member_Readonly_HintInputs */

const en_feishu_bot_member_readonly_hint = /** @type {(inputs: Feishu_Bot_Member_Readonly_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Only Owner/Admin can manage bots; Members can view the current routing.`)
};

const zh_feishu_bot_member_readonly_hint = /** @type {(inputs: Feishu_Bot_Member_Readonly_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`只有 Owner/Admin 可以管理 Bot；Member 只读查看当前路由关系。`)
};

/**
* | output |
* | --- |
* | "Only Owner/Admin can manage bots; Members can view the current routing." |
*
* @param {Feishu_Bot_Member_Readonly_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_member_readonly_hint = /** @type {((inputs?: Feishu_Bot_Member_Readonly_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Member_Readonly_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_member_readonly_hint(inputs)
	return zh_feishu_bot_member_readonly_hint(inputs)
});