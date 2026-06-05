import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Users, Plus, Mail, Phone } from 'lucide-react';

export default function AssociationDetail() {
  const { id } = useParams();
  const [association, setAssociation] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddMember, setShowAddMember] = useState(false);
  const [memberEmail, setMemberEmail] = useState('');

  useEffect(() => {
    fetchAssociationDetail();
    fetchMembers();
  }, [id]);

  const fetchAssociationDetail = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/associations/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      setAssociation(response.data);
    } catch (error) {
      console.error('Error fetching association:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/associations/${id}/members`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      setMembers(response.data.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      // Find user by email first (mock - in real app would call API)
      setShowAddMember(false);
      setMemberEmail('');
      fetchMembers();
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!association) {
    return <div className="text-center py-12">Association not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">{association.name}</h1>
          <p className="text-gray-600 mt-2">{association.description}</p>
          <div className="flex gap-4 mt-4 flex-wrap">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
              {association.type}
            </span>
            {association.industry && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                {association.industry}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Members Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Members</h2>
                <button
                  onClick={() => setShowAddMember(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add Member
                </button>
              </div>

              {members.length > 0 ? (
                <div className="space-y-4">
                  {members.map(member => (
                    <div key={member._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{member.user?.fullName}</p>
                          <div className="space-y-1 mt-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Mail size={16} />
                              {member.user?.email}
                            </div>
                            {member.user?.phone && (
                              <div className="flex items-center gap-2">
                                <Phone size={16} />
                                {member.user.phone}
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          {member.role}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Joined: {new Date(member.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">No members yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Stats Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-gray-900 mb-4">Statistics</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Total Members</p>
                  <p className="text-3xl font-bold text-indigo-600">{association.stats?.totalMembers || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-3xl font-bold text-green-600">{association.stats?.totalProducts || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-blue-600">${association.stats?.totalRevenue || 0}</p>
                </div>
              </div>
            </div>

            {association.contactEmail && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Email:</strong> {association.contactEmail}</p>
                  {association.contactPhone && <p><strong>Phone:</strong> {association.contactPhone}</p>}
                  {association.website && <p><strong>Website:</strong> {association.website}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Member</h2>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Member Email
                </label>
                <input
                  type="email"
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                  placeholder="member@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddMember(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
