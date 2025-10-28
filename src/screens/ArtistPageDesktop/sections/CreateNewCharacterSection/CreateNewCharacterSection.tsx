import { useState, FC } from "react";
import { Button } from "../../../../components/ui/button";

// Modal overlay styles for mobile and desktop
const modalWrapper =
  "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50";
const modalBox =
  "bg-white min-h-[400px] rounded-lg shadow-lg w-full max-w-2xl mx-2 p-0 overflow-hidden flex flex-col md:flex-row";
const sectionTitle =
  "text-lg font-bold mb-2 text-gray-700";
const scrollable =
  "scrollable overflow-x-auto whitespace-nowrap flex gap-4 py-2 px-1";
const avatarBtn =
  "flex flex-col items-center border-2 rounded-lg cursor-pointer px-2 py-2 transition-all hover:border-[#a259ff]";
const avatarSelected =
  "border-blue-500 ring-2 ring-[#a259ff]";
const skillBtn =
  "flex flex-col items-center border h-[100px] w-[120px] p-3 rounded cursor-pointer transition hover:bg-blue-100";
const skillSelected =
  "bg-[#a259ff]/10 border-[#a259ff] font-semibold";


interface Metadata {
  animation_url: string;
  attributes: Array<Record<string, any>>;
  background_color: string;
  description: string;
  external_url: string;
  image: string;
  name: string;
  uri: string;
  youtube_url: string;
};

interface ModalProps {
  onCreate: (avatar: Metadata, assets: Metadata[]) => void;
  assets: Metadata[];
  avatars: Metadata[];
}

export const CreateNewCharacterModal: FC<ModalProps> = ({
  onCreate,
  assets,
  avatars
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<Metadata | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<Metadata[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleSkillToggle = (skill: Metadata) => {
    setSelectedSkills((prev) =>
      prev.find((s) => s.name === skill.name)
        ? prev.filter((s) => s.name !== skill.name)
        : [...prev, skill]
    );

    console.log(selectedSkills)
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="h-auto items-center justify-center gap-3 px-[25px] py-[12px] rounded-[12px] border-2 border-solid border-[#a259ff] transition-all duration-[0.3s] ease-[ease] bg-transparent hover:bg-[#a259ff]/10">
        <span className="[font-family:'Work_Sans',Helvetica] font-semibold text-[#ffffff] text-base text-center tracking-[0] leading-[22.4px] whitespace-nowrap">
          Create New Character
        </span>
      </Button>

      {open &&
        <div className={modalWrapper}>
          <div className={modalBox}>
            {/* Avatars Section */}
            <div className="flex-1 p-5 flex justify-between flex-col border-r max-w-[60%]">
              <div>
                <div className={sectionTitle}>Choose Avatar</div>
                {/* Force scrollable (horizontal) container to work by preventing flex from limiting width and allowing overflow */}
                <div
                  className={scrollable}
                  tabIndex={0}
                >
                  {avatars?.map((av) => (
                    <button
                      aria-label={`Select avatar ${av.name}`}
                      key={av.name}
                      onClick={() => setSelectedAvatar(av)}
                      className={`${avatarBtn} ${selectedAvatar?.name === av.name ? avatarSelected : "border-gray-200"}`}
                    >
                      <img
                        src={av.image}
                        alt={av.name}
                        className="w-16 h-16 rounded-full object-cover mb-2"
                      />
                      <span className="text-xs text-gray-800">{av.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className={sectionTitle + " mt-6"}>Pick an Asset</div>
                <div className={scrollable}>
                  {assets?.map((skill) => (
                    <button
                      aria-label={`Toggle skill ${skill.name}`}
                      key={skill.name}
                      onClick={() => handleSkillToggle(skill)}
                      className={
                        skillBtn +
                        " " +
                        (selectedSkills.find((s) => s.name === skill.name)
                          ? skillSelected
                          : "border-gray-300")
                      }
                    >
                      <img
                        src={skill.image}
                        alt={skill.name}
                        className="w-full h-[60%] object-contain mb-2"
                      />
                      <span className="text-xs border mt-1 font-semibold">{skill.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Preview and Actions */}
            <div className="w-full md:w-80 p-5 flex flex-col gap-4 bg-gray-50">
              <div className={sectionTitle}>Preview</div>
              <div className="flex flex-col items-center justify-between h-full w-full">
                <div className="flex flex-col items-center gap-2 min-h-[120px]">
                  {selectedAvatar ? (
                    <>
                      <img
                        src={selectedAvatar.image}
                        alt="Selected Avatar"
                        className="w-40 h-40 rounded-full mb-2"
                      />
                      <span className="font-medium text-base">{selectedAvatar.name}</span>
                    </>
                  ) : (
                    <span className="text-gray-400 text-sm">No avatar selected</span>
                  )}
                  {/* <div className="flex flex-wrap gap-2 mt-2">
                    {selectedSkills.length > 0
                      ? selectedSkills.map((skill) => (
                        <div
                          key={skill.name}
                          className="px-2 py-1 bg-blue-100 border border-[#a259ff] rounded text-xs flex items-center gap-1"
                        >
                          <img
                            src={skill.image}
                            alt={skill.name}
                            className="w-16 h-16 rounded-full object-cover mb-2 border"
                          />
                          <span>{skill.name}</span>
                        </div>
                      ))
                      : <span className="text-gray-400 text-xs">No skills selected</span>
                    }
                  </div> */}
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <Button
                    className={`w-full mt-2 text-white font-semibold h-[45px] sm:h-[45px] px-6 sm:px-[50px] py-0 bg-call-to-action rounded-[20px] hover:bg-call-to-action/90 transition-all duration-300 ease-in-out ${selectedAvatar && selectedSkills.length > 0
                      ? ""
                      : "cursor-not-allowed"
                      }`}
                    disabled={!selectedAvatar || selectedSkills.length === 0}
                    onClick={() => {
                      if (selectedAvatar && selectedSkills.length > 0)
                        onCreate(selectedAvatar, selectedSkills);
                    }}
                  >
                    Create Character
                  </Button>

                  <Button
                    className="w-full rounded-[20px] text-white mt-0 text-center text-sm h-[45px]"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};
