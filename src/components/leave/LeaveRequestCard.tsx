import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

const statusColors = {

  pending: '#f39c12',

  approved: '#2ecc71',

  rejected: '#e74c3c',

};

interface LeaveRequest {
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const LeaveRequestCard = ({ request, onPress }: { request: LeaveRequest; onPress: () => void }) => {

  return (

    <TouchableOpacity style={styles.container} onPress={onPress}>

      <View style={styles.dateContainer}>

        <Text style={styles.date}>{request.startDate}</Text>

        <MaterialIcons name="arrow-forward" size={16} color="#95a5a6" />

        <Text style={styles.date}>{request.endDate}</Text>

      </View>

      <Text style={styles.reason}>{request.reason}</Text>

      <View style={[styles.status, { backgroundColor: statusColors[request.status] }]}>

        <Text style={styles.statusText}>{request.status.toUpperCase()}</Text>

      </View>

    </TouchableOpacity>

  );

};

const styles = StyleSheet.create({

  container: {

    backgroundColor: '#fff',

    borderRadius: 8,

    padding: 16,

    marginVertical: 8,

    elevation: 2,

  },

  dateContainer: {

    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 8,

  },

  date: {

    color: '#3498db',

    marginHorizontal: 4,

  },

  reason: {

    color: '#2c3e50',

    marginBottom: 8,

  },

  status: {

    alignSelf: 'flex-start',

    paddingVertical: 4,

    paddingHorizontal: 8,

    borderRadius: 4,

  },

  statusText: {

    color: '#fff',

    fontSize: 12,

  },

});
