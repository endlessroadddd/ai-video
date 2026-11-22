/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Service_Event_Query_Schema_Not_ExposedInputs */

const en_service_event_query_schema_not_exposed = /** @type {(inputs: Service_Event_Query_Schema_Not_ExposedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The \`lucius_agent\` schema is not exposed in Supabase API yet. Add \`lucius_agent\` in Supabase Dashboard -> Project Settings -> API -> Exposed schemas, then try again.`)
};

const zh_service_event_query_schema_not_exposed = /** @type {(inputs: Service_Event_Query_Schema_Not_ExposedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Supabase API 尚未暴露 schema \`lucius_agent\`。请在 Supabase Dashboard -> Project Settings -> API -> Exposed schemas 中添加 \`lucius_agent\` 后重试。`)
};

/**
* | output |
* | --- |
* | "The `lucius_agent` schema is not exposed in Supabase API yet. Add `lucius_agent` in Supabase Dashboard -> Project Settings -> API -> Exposed schemas, then tr..." |
*
* @param {Service_Event_Query_Schema_Not_ExposedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_event_query_schema_not_exposed = /** @type {((inputs?: Service_Event_Query_Schema_Not_ExposedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Event_Query_Schema_Not_ExposedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_event_query_schema_not_exposed(inputs)
	return zh_service_event_query_schema_not_exposed(inputs)
});