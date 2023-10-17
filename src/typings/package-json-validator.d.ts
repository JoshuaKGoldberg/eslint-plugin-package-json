declare module 'package-json-validator' {
    export type PackageJsonSpec = 'npm' | 'commonjs_1.0' | 'commonjs_1.1';

    export interface PackageValidationOptions {
        recommendations?: boolean;
        warnings?: boolean;
    }

    export interface PackageValidationResult {
        errors?: string[];
    }

    export namespace PJV {
        export function validate(
            data: unknown,
            spec?: PackageJsonSpec,
            options?: unknown
        ): PackageValidationResult;
    }
}
