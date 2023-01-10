import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';

import {
  getFacebookAuth,
  checkDbStatus,
  getDbFromServer,
} from '../redux/actions/onAuthActions';

const Login = () => {
  const { statusDb } = useSelector(state => state.auth);
  const { isReady } = useSelector(state => state.scheduleFilter);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const loginWithFacebook = () => {
    dispatch(getFacebookAuth());
  };
  const onPressToApp = () => {
    setLoading(true);
    if (!statusDb) {
      dispatch(getDbFromServer());
    }
  };
  useEffect(() => {
    dispatch(checkDbStatus());
  }, []);
  useEffect(() => {
    if (loading && isReady) {
      dispatch({ type: 'TO_APP' });
    }
  }, [isReady, loading]);

  return (
    <View style={styles.container}>
      <>
        <TouchableOpacity
          style={styles.button}
          onPress={() => loginWithFacebook()}
          activeOpacity={0.7}>
          <Text style={styles.buttonText}>Facebook Login</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#aaa" />
        ) : (
          <TouchableOpacity
            style={{ textAlign: 'center', color: '#2f39a6' }}
            onPress={() => onPressToApp()}
            activeOpacity={0.7}>
            <Text style={{ textAlign: 'center', color: '#2f39a6' }}>
              go to App
            </Text>
          </TouchableOpacity>
        )}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  button: {
    backgroundColor: '#2f39a6',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    color: '#fff',
    marginTop: 30,
    marginBottom: 40,
  },
  buttonText: { color: '#fff', fontSize: 20 },
});

export default Login;
