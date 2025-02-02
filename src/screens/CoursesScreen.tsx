import { useState } from 'react';

import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { MaterialItem } from '../components/courses/MaterialItem';

import { FloatingActionButton } from '../components/common/FloatingActionButton';

import { useAuth } from '../contexts/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';

const mockCourses = [

  {

    id: '1',

    name: 'Mathematics 101',

    materials: [

      { id: '1', type: 'pdf', title: 'Algebra Basics', date: '2023-08-15' },

      { id: '2', type: 'video', title: 'Lecture 1: Introduction', date: '2023-08-16' },

    ],

  },

  {

    id: '2',

    name: 'Physics Fundamentals',

    materials: [

      { id: '3', type: 'pdf', title: 'Kinematics Notes', date: '2023-08-14' },

    ],

  },

];

export const CoursesScreen = () => {

  const { user } = useAuth();

  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const handleUpload = () => {

    // Implement upload logic

  };

  return (

    <View style={styles.container}>

      <ScrollView>

        {mockCourses.map((course) => (

          <View key={course.id} style={styles.courseCard}>

            <TouchableOpacity 

              onPress={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}

              style={styles.courseHeader}

            >

              <Text style={styles.courseTitle}>{course.name}</Text>

              <MaterialIcons 

                name={expandedCourse === course.id ? 'expand-less' : 'expand-more'} 

                size={24} 

                color="#2c3e50" 

              />

            </TouchableOpacity>

            

            {expandedCourse === course.id && (

              <View style={styles.materialsContainer}>

                {course.materials.map((material) => (

                  <MaterialItem

                    key={material.id}

                    type={material.type}

                    title={material.title}

                    date={material.date}

                  />

                ))}

              </View>

            )}

          </View>

        ))}

      </ScrollView>

      {user?.role === 'teacher' && (

        <FloatingActionButton onPress={handleUpload} />

      )}

    </View>

  );

};

const styles = StyleSheet.create({

  container: {

    flex: 1,

    padding: 16,

  },

  courseCard: {

    backgroundColor: '#fff',

    borderRadius: 8,

    marginBottom: 16,

    elevation: 2,

  },

  courseHeader: {

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    padding: 16,

  },

  courseTitle: {

    fontSize: 18,

    fontWeight: '600',

  },

  materialsContainer: {

    paddingHorizontal: 16,

    paddingBottom: 16,

  },

});
