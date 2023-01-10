// MATCHUP actions
export const queryMatchupTags = teamId =>
  `SELECT athletes.rid,athletes.id,athletes.team_id, tags_master.tag_id FROM athletes INNER JOIN tags_master ON (tags_master.athlete_id = athletes.id AND tags_master.tag_id IS NOT NULL) WHERE athletes.team_id IN (${teamId})`;
export const queryMatchupData = currentPage =>
  `SELECT schedule.id,schedule.court,schedule.div,schedule.team_1_id,schedule.team_2_id,schedule.sdate,schedule.stime, teams.name AS name1, teams2.name AS name2, team_flags1.flag AS flagTeam1, team_flags2.flag AS flagTeam2 FROM schedule LEFT JOIN teams ON schedule.team_1_id = teams.id LEFT JOIN teams AS teams2 ON schedule.team_2_id = teams2.id LEFT JOIN team_flags AS team_flags1 ON schedule.team_1_id = team_flags1.team_id LEFT JOIN team_flags AS team_flags2 ON schedule.team_2_id = team_flags2.team_id LIMIT 10 OFFSET ${currentPage}`;

// ATHLETE TAGS actions
export const queryDeleteTagsData = (athleteId, elementId) =>
  `DELETE FROM tags_master WHERE ( athlete_id = ${athleteId} AND tag_id = ${elementId})`;
export const queryInsertTagsData = `INSERT INTO tags_master (athlete_id, coach_id, tag_id) VALUES (?, ?, ?)`;
export const queryGetALLTags = `SELECT * FROM tags WHERE tags.deleted_at IS NULL`;

// RECRUITS actions
export const queryRecruitsData = currentPage =>
  `SELECT athletes.id,athletes.uniform,athletes.last_name,athletes.first_name,athletes.team_id, teams.name FROM athletes INNER JOIN teams ON athletes.team_id = teams.id ORDER BY athletes.last_name ASC LIMIT 10 OFFSET ${currentPage}`;
export const queryRecruitsTags = searchId =>
  `SELECT tags_master.id AS mainId,tags_master.athlete_id, tags_master.tag_id, tags.* FROM tags_master LEFT JOIN tags ON tags_master.tag_id = tags.id AND tags.deleted_at IS NULL WHERE athlete_id IN (${searchId})`;

// ROSTER actions
export const queryRosterData = currentPage =>
  `SELECT athletes.id,athletes.uniform,athletes.last_name,athletes.first_name,athletes.team_id, teams.name FROM athletes INNER JOIN teams ON athletes.team_id = teams.id ORDER BY athletes.last_name ASC LIMIT 10 OFFSET ${currentPage}`;
export const queryRosterTags = searchId =>
  `SELECT tags_master.id AS mainId,tags_master.athlete_id, tags_master.tag_id, tags.* FROM tags_master LEFT JOIN tags ON tags_master.tag_id = tags.id AND tags.deleted_at IS NULL WHERE athlete_id IN (${searchId})`;

// SCHEDULE actions
export const queryScheduleData = (currentPage, filters) =>
  `SELECT schedule.id,schedule.court,schedule.div,schedule.team_1_id,schedule.team_2_id,schedule.sdate,schedule.stime, teams.name AS name1, teams2.name AS name2, team_flags1.flag AS flagTeam1, team_flags2.flag AS flagTeam2 FROM schedule LEFT JOIN teams ON schedule.team_1_id = teams.id LEFT JOIN teams AS teams2 ON schedule.team_2_id = teams2.id LEFT JOIN team_flags AS team_flags1 ON schedule.team_1_id = team_flags1.team_id LEFT JOIN team_flags AS team_flags2  ON schedule.team_2_id = team_flags2.team_id WHERE sdate = '${filters.Date.dbValue}' AND stime = '${filters.Time.dbValue}' LIMIT 5 OFFSET ${currentPage}`;
export const querySchedulePlayers = searchId =>
  `SELECT  athletes.rid,athletes.id,athletes.first_name,athletes.last_name,athletes.uniform,athletes.team_id FROM athletes WHERE athletes.team_id IN (${searchId})`;
export const queryScheduleTags = searchId =>
  `SELECT tags_master.id AS mainId,tags_master.athlete_id, tags_master.tag_id, tags.* FROM tags_master LEFT JOIN tags ON tags_master.tag_id = tags.id AND tags.deleted_at IS NULL WHERE athlete_id IN (${searchId})`;

// SCHEDULE_FILTER actions
export const queryScheduleTime = `SELECT DISTINCT schedule.sdate,schedule.stime FROM schedule ORDER BY schedule.stime`;
export const queryScheduleTDate = `SELECT DISTINCT schedule.sdate FROM schedule ORDER BY schedule.sdate`;

// TEAMS actions
export const queryTeamsTags = teamId =>
  `SELECT athletes.rid,athletes.id,athletes.team_id, tags_master.tag_id FROM athletes INNER JOIN tags_master ON (tags_master.athlete_id = athletes.id AND tags_master.tag_id IS NOT NULL) WHERE athletes.team_id IN (${teamId})`;
export const queryTeamsData = currentPage =>
  `SELECT teams.id,teams.name AS teamName, clubs.name, team_flags.flag FROM teams LEFT JOIN clubs ON teams.club_id = clubs.id LEFT JOIN team_flags ON teams.id = team_flags.team_id ORDER BY teams.name ASC LIMIT 10 OFFSET ${currentPage}`;
