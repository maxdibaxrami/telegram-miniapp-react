import { Calendar, DateValue } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { parseDate, today, getLocalTimeZone } from "@internationalized/date";
import { useTranslation } from "react-i18next";

const ProfileDataAuth2 = ({ setSlideAvailable, setSlideUnAvailable, user }) => {
  // Set the initial value to "2000-01-14"
  const [value, setValue] = useState<DateValue | null>(parseDate(user.age));
  const { t } = useTranslation();

  useEffect(() => {
    const formattedDate = formatDate(value);

    if (value !== null) {
      setSlideAvailable("age" , formattedDate);
    } else {
      setSlideUnAvailable("age" , formattedDate);
    }
    
  }, [value]);

  // Helper function to format date to "YYYY-MM-DD"
  const formatDate = (dateValue: DateValue) => {
    return `${dateValue.year}-${String(dateValue.month).padStart(2, "0")}-${String(dateValue.day).padStart(2, "0")}`;
  };

  // Handle date change and format it to "YYYY-MM-DD"
  const handleDateChange = (newValue: DateValue | null) => {
    if (newValue) {
      const formattedDate = formatDate(newValue);
      setValue(parseDate(formattedDate))
    }
    ; // Set the selected date
  };

  // Set the minimum date to 1900-01-01
  const minDate = parseDate("1900-01-01");

  // Calculate today's date minus 18 years
  const todayDate = today(getLocalTimeZone());
  const maxDate = todayDate.subtract({ years: 18 });

  return (
    <div className="flex justify-between flex-col px-6 pt-8 pb-4">
      <form className="flex w-full flex-col gap-4">
        <p className="mb-1 font-medium">{t("Selectdateofbirth")} </p>
        <Calendar
          value={value}
          onChange={handleDateChange}  // Use the custom handler
          style={{ width: "100%" }}
          showMonthAndYearPickers
          aria-label="Date (Show Month and Year Picker)"
          minValue={minDate}
          maxValue={maxDate}
        />
      </form>
    </div>
  );
};

export default ProfileDataAuth2;
