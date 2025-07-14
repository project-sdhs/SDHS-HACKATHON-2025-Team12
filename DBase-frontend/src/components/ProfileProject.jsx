import {
  ProfileRecordWrap,
  SectionItemWrap,
  SectionSmallTtile,
  SectionSubTitle,
} from "../style/SectionLayoutStyle";
import StackItem from "./StackItem";

const ProfileProject = ({ ProjectName, ProjectExplain, ProjectStacks }) => {
  return (
    <>
      <ProfileRecordWrap>
        <SectionSubTitle>{ProjectName}</SectionSubTitle>
        <SectionSmallTtile>{ProjectExplain}</SectionSmallTtile>
        <div style={{ display: "flex", gap: "10px" }}>
          {ProjectStacks &&
            ProjectStacks.split(",").map((stack, index) => (
              <StackItem key={index} Stack={stack} />
            ))}
        </div>
      </ProfileRecordWrap>
    </>
  );
};

export default ProfileProject;
