import React from "react";
import HomePageSlider from "./HomePageSlider";
import RecentHabits from "../MyHabit/RecentHabits/RecentHabits";
import WhyChoose from "../WhyChoose/WhyChoose";
import WhyBuildHabits from "../WhyChoose/WhyBuildHabits";
import HabitHero from "../NewsLetterSection/HabitHero";

const Home = () => {
  return (
    <div>
      <HomePageSlider />

      <RecentHabits />
      <WhyBuildHabits></WhyBuildHabits>
      <WhyChoose></WhyChoose>
      {/* <NewsLetterSection></NewsLetterSection> */}
      <HabitHero></HabitHero>
    </div>
  );
};

export default Home;