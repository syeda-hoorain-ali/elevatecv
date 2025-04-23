import PersonalDetails from "./form/personal-details";
import Summary from "./form/summary";
import Education from "./form/education";
import Experience from "./form/experience";
import Skills from "./form/skills";
import Congrates from "./congrates";
import Languages from "./form/language";
import Interests from "./form/interests";
import { useResume } from "@/context/ResumeContext";

const FormSection = () => {

  const { step } = useResume()

  return (
    <div className="h-fit w-full">

      {step === 1 ? <PersonalDetails /> : ''}
      {step === 2 ? <Summary /> : ''}
      {step === 3 ? <Experience /> : ''}
      {step === 4 ? <Education /> : ''}
      {step === 5 ? <Languages /> : ''}
      {step === 6 ? <Skills /> : ''}
      {step === 7 ? <Interests /> : ''}
      {step === 8 ? <Congrates /> : ''}

    </div>
  )
}

export default FormSection
