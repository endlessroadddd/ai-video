/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workgroup_Slack_Connect_FirstInputs */

const en_workgroup_slack_connect_first = /** @type {(inputs: Workgroup_Slack_Connect_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connect a Slack workspace in Slack settings before choosing workgroups.`)
};

const zh_workgroup_slack_connect_first = /** @type {(inputs: Workgroup_Slack_Connect_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先在 Slack 设置中完成工作区关联，再回来选择工作群。`)
};

/**
* | output |
* | --- |
* | "Connect a Slack workspace in Slack settings before choosing workgroups." |
*
* @param {Workgroup_Slack_Connect_FirstInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_slack_connect_first = /** @type {((inputs?: Workgroup_Slack_Connect_FirstInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Slack_Connect_FirstInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workgroup_slack_connect_first(inputs)
	return zh_workgroup_slack_connect_first(inputs)
});