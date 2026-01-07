import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PlusCircle } from "lucide-react";
import ThreadsList from "../components/ThreadsList";
import ThreadInput from "../components/ThreadInput";
import CategoryFilter from "../components/CategoryFilter";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import {
  asyncCreateThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from "../states/threads/action";

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser = null,
  } = useSelector((states) => states);

  const dispatch = useDispatch();
  const [showThreadInput, setShowThreadInput] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  // Get unique categories
  const categories = [
    ...new Set(threads.map((thread) => thread.category).filter(Boolean)),
  ];

  // Filter threads by category
  const filteredThreads = selectedCategory
    ? threadList.filter((thread) => thread.category === selectedCategory)
    : threadList;

  const onAddThread = ({ title, body, category }) => {
    if (!authUser) {
      alert("Please login to create a thread");
      return;
    }

    dispatch(asyncCreateThread({ title, body, category }))
      .then(() => {
        setShowThreadInput(false);
      })
      .catch(() => {
        // Error already handled in action
      });
  };

  const onUpVote = (threadId) => {
    dispatch(asyncUpVoteThread(threadId));
  };

  const onDownVote = (threadId) => {
    dispatch(asyncDownVoteThread(threadId));
  };

  const onNeutralVote = (threadId) => {
    dispatch(asyncNeutralVoteThread(threadId));
  };

  const onToggleThreadInput = () => {
    if (!authUser) {
      alert("Please login to create a thread");
      return;
    }
    setShowThreadInput(!showThreadInput);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Discussions
          </h1>
          {authUser && !showThreadInput && (
            <button
              type="button"
              onClick={onToggleThreadInput}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              <span>New Thread</span>
            </button>
          )}
        </div>

        {showThreadInput && (
          <ThreadInput
            addThread={onAddThread}
            onCancel={() => setShowThreadInput(false)}
          />
        )}

        {categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        )}

        {filteredThreads.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {selectedCategory
                ? "No threads found in this category."
                : "No threads yet. Be the first to create one!"}
            </p>
          </div>
        ) : (
          <ThreadsList
            threads={filteredThreads}
            authUser={authUser}
            upVote={onUpVote}
            downVote={onDownVote}
            neutralVote={onNeutralVote}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
