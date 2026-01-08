import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  ThreadsList,
  ThreadInput,
  CategoryFilter,
  Sidebar,
  PageTransition,
} from '../components';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  asyncCreateThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from '../states/threads/action';

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser = null,
  } = useSelector((states) => states);

  const dispatch = useDispatch();
  const [showThreadInput, setShowThreadInput] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAddingThread, setIsAddingThread] = useState(false);

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
      toast.error('Please login to create a thread');
      return;
    }

    setIsAddingThread(true);
    dispatch(asyncCreateThread({ title, body, category }))
      .then(() => {
        setShowThreadInput(false);
        toast.success('Thread created successfully!');
      })
      .finally(() => {
        setIsAddingThread(false);
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
      toast.error('Please login to create a thread');
      return;
    }
    setShowThreadInput(!showThreadInput);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Discussions
                </h1>
                {authUser ? (
                  !showThreadInput && (
                    <button
                      type="button"
                      onClick={onToggleThreadInput}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <PlusCircle className="w-5 h-5" />
                      <span>New Thread</span>
                    </button>
                  )
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <span>Login to post</span>
                  </Link>
                )}
              </div>

              {showThreadInput && (
                <ThreadInput
                  addThread={onAddThread}
                  onCancel={() => setShowThreadInput(false)}
                  loading={isAddingThread}
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
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    {selectedCategory
                      ? 'No threads found in this category.'
                      : 'No threads yet. Be the first to create one!'}
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

            {/* Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-20">
                <Sidebar
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default HomePage;
