import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trophy } from 'lucide-react';
import { LeaderboardItem, PageTransition } from '../components';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const { leaderboards = [] } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center space-x-3 mb-6">
            <Trophy className="w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Leaderboards
            </h1>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Top contributors in our community
          </p>

          {leaderboards.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No leaderboard data available yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {leaderboards.map((leaderboard, index) => (
                <LeaderboardItem
                  key={leaderboard.user.id}
                  user={leaderboard.user}
                  score={leaderboard.score}
                  rank={index + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default LeaderboardsPage;
