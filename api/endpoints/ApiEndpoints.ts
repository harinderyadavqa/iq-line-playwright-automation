
export const API_ENDPOINTS = {
    PATIENT_SEARCH: '/openmrs/ws/rest/v1/bahmni/search/patient',
} as const;

export function patientSearchParams(query: string): URLSearchParams {
    const params = new URLSearchParams();

    params.append('addressFieldValue', '');
    params.append('customAttribute', '');
    params.append('loginLocationUuid', 'b5da9afd-b29a-4cbf-91c9-ccf2aa5f799e');
    params.append('patientAttributes', 'phoneNumber');
    params.append('patientAttributes', 'alternatePhoneNumber');
    params.append('patientSearchResultsConfig', 'phoneNumber');
    params.append('patientSearchResultsConfig', 'alternatePhoneNumber');
    params.append('programAttributeFieldValue', '');
    params.append('q', query);
    params.append('s', 'byIdOrNameOrVillage');
    params.append('startIndex', '0');

    return params;
}
