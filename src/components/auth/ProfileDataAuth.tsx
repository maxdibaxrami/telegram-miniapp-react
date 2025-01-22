import useViewportHeight from "@/hooks/useViewPortHook";
import { CalenderIcon, ProfileIcon } from "@/Icons";
import { Input, Textarea, Calendar, DateValue } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { parseDate, today, getLocalTimeZone } from "@internationalized/date";

const ProfileDataAuth = ({ setSlideAvailable, setSlideUnAvailable, user }) => {
  const { t } = useTranslation();
  
  const [name, setName] = useState(user.firstName);
  const [bio, setBio] = useState(user.bio);

  const [age, setAge] = useState(null);
  const [dateBirth, setDateBirth] = useState(user.dateBirth || null);
  
  const height = useViewportHeight();
  console.log(height)
  // Calculate the age based on the selected date
  const calculateAge = (birthDateString) => {
    const birthDate = new Date(birthDateString);
    const today = new Date();
  
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();
  
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }
    return age;
  };

  // Set the initial value for the calendar
  const initialDate = dateBirth ? parseDate(dateBirth) : parseDate("2000-01-14");
  const [value, setValue] = useState<DateValue | null>(initialDate);

  useEffect(() => {
    const formattedDate = formatDate(value);
    if (value !== null) {
      setDateBirth(formattedDate);
      setAge(calculateAge(formattedDate));
    }
  }, [value]);

  // Helper function to format the date
  const formatDate = (dateValue: DateValue) => {
    return `${dateValue.year}-${String(dateValue.month).padStart(2, "0")}-${String(dateValue.day).padStart(2, "0")}`;
  };

  // Handle date change in the calendar
  const handleDateChange = (newValue: DateValue | null) => {
    if (newValue) {
      const formattedDate = formatDate(newValue);
      setValue(parseDate(formattedDate));
    }
  };

  // Minimum date (for the calendar)
  const minDate = parseDate("1900-01-01");
  const todayDate = today(getLocalTimeZone());
  const maxDate = todayDate.subtract({ years: 18 });

  // Check form validity to allow slide changes
  useEffect(() => {
    if (name.length > 3 && bio.length > 3 && name.length < 15 && bio.length < 100 && age) {
      setSlideAvailable("firstName", name);
      setSlideAvailable("bio", bio);
      setSlideAvailable("dateBirth", dateBirth);
      setSlideAvailable("age", age);
      return;
    }
    setSlideUnAvailable();
  }, [name, bio, dateBirth, age]);

  return (
    <div className="flex justify-between flex-col px-6 pt-8 pb-4">
      <form className="flex w-full flex-col gap-2">
        <div className="mb-1 mt-1 flex gap-2 items-center">
          <div className="flex items-center rounded-full justify-center p-2 bg-default/30 text-primary/80">
            <ProfileIcon className="size-8" />
          </div>
          <p className="font-bold text-medium">{t('Fillprofiledata')}</p>
        </div>

        <Input
          variant="bordered"
          classNames={{ "inputWrapper": "bg-neutral/10 !border-primary/40" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          isRequired
          label={t('name')}
          type="text"
          color="default"
          className="w-full"
        />

        <Textarea
          className="w-full"
          label={t('Bio')}
          isRequired
          value={bio}
          classNames={{ "inputWrapper": "bg-neutral/10 !border-primary/40" }}
          variant="bordered"
          color="default"
          onChange={(e) => setBio(e.target.value)}
          placeholder={t('EnteryourBio')}
        />

        <div className="mb-1 mt-1 flex gap-2 items-center">
          <div className="flex items-center rounded-full justify-center p-2 bg-default/30 text-primary/80">
            <CalenderIcon className="size-8" />
          </div>
          <p className="font-bold text-medium">{t('Selectdateofbirth')}</p>
        </div>

        <Calendar
          value={value}
          onChange={handleDateChange}
          style={{ width: "100%" }}
          showMonthAndYearPickers
          aria-label="Date (Show Month and Year Picker)"
          minValue={minDate}
          maxValue={maxDate}
          calendarWidth={"full"}
          color="primary"
          classNames={{ 
            "headerWrapper": "bg-primary/70",
            "gridHeaderRow": "bg-neutral/20 pt-1 pb-1",
            "gridWrapper": "bg-neutral/10",
            "prevButton":"text-white/50 border-white/40",
            "nextButton":"text-white/50 border-white/40",
            
          }}
        />
      </form>
    </div>
  );
};

export default ProfileDataAuth;
