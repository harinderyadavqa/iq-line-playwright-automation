
export function generatePatientData() {
    // Convert each timestamp digit into a letter: 0=A, 1=B, ... 9=J
    const suffix = Date.now().toString().replace(/\d/g, (digit) =>
        String.fromCharCode(65 + Number(digit))
    );

    return {
        firstName: `Test${suffix}`,
        lastName: `Patient${suffix}`,
        email: `patient_${Date.now()}@example.com`,
    };
}
