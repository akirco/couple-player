import { Video } from '@/components/video';
import { StoragedVideo } from '@/types/video';
import { Pencil2Icon, TimerIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

const History: React.FC<{
  historyList: StoragedVideo[];
  handleRemoveRecord: (storageId: string) => void;
}> = ({ historyList, handleRemoveRecord }) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="flex flex-col p-5 gap-5 max-w-6xl m-auto">
      <h1 className="inline-flex items-center gap-1 text-2xl font-semibold justify-between">
        <span className="px-3 py-2 select-none rounded-full inline-flex items-center gap-2 bg-secondary">
          <TimerIcon className="w-8 h-8" />
          History
        </span>
        {isEdit ? (
          <span
            className="px-3 py-2 select-none rounded-full cursor-pointer bg-primary hover:bg-primary/90"
            onClick={() => setIsEdit(false)}
          >
            Stop editing
          </span>
        ) : (
          <span
            className="p-2 rounded-full cursor-pointer bg-primary hover:bg-primary/90"
            onClick={() => setIsEdit(true)}
          >
            <Pencil2Icon className="w-8 h-8" />
          </span>
        )}
      </h1>
      <div className="flex flex-wrap gap-2">
        {historyList?.map((video) => (
          <Video
            key={video.storageId}
            video={video}
            isStoraged
            isEdit={isEdit}
            onRemove={() => handleRemoveRecord(video.storageId)}
          />
        ))}
      </div>
    </div>
  );
};
export default History;
