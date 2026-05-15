// Personal information form component
import type { PersonalInfo } from "../../../types/types";
import FormField from "../ui/FormField";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onPersonalInfoChange: (data: PersonalInfo) => void;
}

export default function PersonalInfoForm({
  data,
  onPersonalInfoChange,
}: PersonalInfoFormProps) {
  // Merges the updated field into the existing data — keyof PersonalInfo ensures field can only be a valid key of the type
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onPersonalInfoChange({ ...data, [field]: value });
  };

  return (
    <div className="grid gap-4">
      {/* First Name */}
      <FormField
        label="First Name"
        value={data.firstName}
        onChange={(value) => handleChange("firstName", value)}
        placeholder="John"
      />
      {/* Last Name */}
      <FormField
        label="Last Name"
        value={data.lastName}
        onChange={(value) => handleChange("lastName", value)}
        placeholder="Doe"
      />
      {/* Email */}
      <FormField
        label="Email"
        value={data.email}
        onChange={(value) => handleChange("email", value)}
        placeholder="john@example.com"
        type="email"
      />
      {/* Phone */}
      <FormField
        label="Phone"
        value={data.phone}
        onChange={(value) => handleChange("phone", value)}
        placeholder="+1 (555) 000-0000"
        type="tel"
      />
      {/* Location */}
      <FormField
        label="Location"
        value={data.location}
        onChange={(value) => handleChange("location", value)}
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
