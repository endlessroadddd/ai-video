/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Workgroup_Feishu_ReadyInputs */

const en_workgroup_feishu_ready = /** @type {(inputs: Workgroup_Feishu_ReadyInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} Feishu chats synced. You can continue selecting workgroups.`)
};

const zh_workgroup_feishu_ready = /** @type {(inputs: Workgroup_Feishu_ReadyInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已同步 ${i?.count} 个飞书群，可继续选择工作群。`)
};

/**
* | output |
* | --- |
* | "{count} Feishu chats synced. You can continue selecting workgroups." |
*
* @param {Workgroup_Feishu_ReadyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_feishu_ready = /** @type {((inputs: Workgroup_Feishu_ReadyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Feishu_ReadyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workgroup_feishu_ready(inputs)
	return zh_workgroup_feishu_ready(inputs)
});