// Personal information form component
import { useState } from "react";
import FormField from "../ui/FormField";
import { personalInfoSchema } from "../../../lib/schemas";
import type { PersonalInfo } from "../../../lib/schemas";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onPersonalInfoChange: (data: PersonalInfo) => void;
}

// Each key of PersonalInfo maps to an optional error string —
// keyof PersonalInfo extracts all field names as a union,
// Record maps each to a string, Partial makes them all optional
type FormErrors = Partial<Record<keyof PersonalInfo, string>>;

export default function PersonalInfoForm({
  data,
  onPersonalInfoChange,
}: PersonalInfoFormProps) {
  const [errors, setErrors] = useState<FormErrors>({});

  // Merges the updated field into the existing data — keyof PersonalInfo ensures field can only be a valid key of the type
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onPersonalInfoChange({ ...data, [field]: value });
    if (errors[field]) {
      validate(field, value);
    }
  };

  // Validates a single field using the Zod schema on blur —
  // shape accesses the individual field schema, safeParse validates the value
  const validate = (field: keyof PersonalInfo, value: string) => {
    const result = personalInfoSchema.shape[field].safeParse(value);
    setErrors((prev) => ({
      ...prev,
      [field]: result.success ? undefined : result.error.issues[0].message,
    }));
  };

  return (
    <div className="grid gap-4">
      {/* First Name */}
      <FormField
        label="First Name"
        value={data.firstName}
        onChange={(value) => handleChange("firstName", value)}
        onBlur={(value) => validate("firstName", value)}
        error={errors.firstName}
        placeholder="John"
      />
      {/* Last Name */}
      <FormField
        label="Last Name"
        value={data.lastName}
        onChange={(value) => handleChange("lastName", value)}
        onBlur={(value) => validate("lastName", value)}
        error={errors.lastName}
        placeholder="Doe"
      />
      {/* Email */}
      <FormField
        label="Email"
        value={data.email}
        onChange={(value) => handleChange("email", value)}
        onBlur={(value) => validate("email", value)}
        error={errors.email}
        placeholder="john@example.com"
        type="email"
      />
      {/* Phone */}
      <FormField
        label="Phone"
        value={data.phone}
        onChange={(value) => handleChange("phone", value)}
        onBlur={(value) => validate("phone", value)}
        error={errors.phone}
        placeholder="+1 (555) 000-0000"
        type="tel"
      />
      {/* Location */}
      <FormField
        label="Location"
        value={data.location}
        onChange={(value) => handleChange("location", value)}
        onBlur={(value) => validate("location", value)}
        error={errors.location}
        placeholder="City, Country"
      />
      {/* LinkedIn */}
      <FormField
        label="LinkedIn"
        value={data.linkedin ?? ""}
        onChange={(value) => handleChange("linkedin", value)}
        placeholder="linkedin.com/in/johndoe"
      />
      {/* GitHub */}
      <FormField
        label="GitHub"
        value={data.github ?? ""}
        onChange={(value) => handleChange("github", value)}
        placeholder="github.com/johndoe"
      />
      {/* Website */}
      <FormField
        label="Website"
        value={data.website ?? ""}
        onChange={(value) => handleChange("website", value)}
        placeholder="johndoe.com"
      />
    </div>
  );
}
