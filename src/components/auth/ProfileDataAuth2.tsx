import { Calendar, DateValue } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { parseDate, today, getLocalTimeZone } from "@internationalized/date";

const ProfileDataAuth2 = ({ setSlideAvailable, setSlideUnAvailable }) => {
  const [value, setValue] = useState<DateValue | null>(parseDate("2000-01-14"));

  useEffect(() => {
    if (value !== null) {
      setSlideAvailable();
    } else {
      setSlideUnAvailable();
    }
  }, [value]);

  // Set the minimum date to 1900-01-01
  const minDate = parseDate("1900-01-01");

  // Calculate today's date minus 18 years
  const todayDate = today(getLocalTimeZone());
  const maxDate = todayDate.subtract({ years: 18 });

  return (
    <div className="flex justify-between flex-col px-6 pt-8 pb-4">
      <form className="flex w-full flex-col gap-4">
        <p className="mb-1 text-left">Select date of birth: </p>
        <Calendar
          value={value}
          onChange={setValue}
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
