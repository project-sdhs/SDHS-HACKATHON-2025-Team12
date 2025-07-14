import {
  ProfileRecordWrap,
  SectionItemWrap,
  SectionSmallTtile,
  SectionSubTitle,
} from "../style/SectionLayoutStyle";

const ProfileAward = ({ AwardDate, AwardTitle, AwardInstitution }) => {
  return (
    <>
      <ProfileRecordWrap>
        <SectionSmallTtile>{AwardDate}</SectionSmallTtile>
        <SectionSubTitle>{AwardTitle}</SectionSubTitle>
        <SectionSmallTtile>{AwardInstitution}</SectionSmallTtile>
      </ProfileRecordWrap>
    </>
  );
};

export default ProfileAward;
