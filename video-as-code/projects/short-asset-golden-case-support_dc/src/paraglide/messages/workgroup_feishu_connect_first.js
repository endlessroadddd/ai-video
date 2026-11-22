/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workgroup_Feishu_Connect_FirstInputs */

const en_workgroup_feishu_connect_first = /** @type {(inputs: Workgroup_Feishu_Connect_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Finish Feishu workgroup access before choosing workgroups.`)
};

const zh_workgroup_feishu_connect_first = /** @type {(inputs: Workgroup_Feishu_Connect_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先完成飞书工作群接入，再回来选择工作群。`)
};

/**
* | output |
* | --- |
* | "Finish Feishu workgroup access before choosing workgroups." |
*
* @param {Workgroup_Feishu_Connect_FirstInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_feishu_connect_first = /** @type {((inputs?: Workgroup_Feishu_Connect_FirstInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Feishu_Connect_FirstInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workgroup_feishu_connect_first(inputs)
	return zh_workgroup_feishu_connect_first(inputs)
});