package com.project.ppmtool.services;

import com.project.ppmtool.domain.Backlog;
import com.project.ppmtool.domain.ProjectTask;
import com.project.ppmtool.repositories.BacklogRepository;
import com.project.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);

        projectTask.setBacklog(backlog);

        Integer BacklogSequence = backlog.getPTSequence();
        BacklogSequence++;

        backlog.setPTSequence(BacklogSequence);

        projectTask.setProjectSequence(projectIdentifier+"-"+BacklogSequence);

        projectTask.setProjectIdentifier(projectIdentifier);

        if(projectTask.getPriority() == null) {
            projectTask.setPriority(3);
        }

        if(projectTask.getStatus() == "" || projectTask.getStatus() == null) {
            projectTask.setStatus("TO_DO");
        }

        return projectTaskRepository.save(projectTask);
    }

    public Iterable<ProjectTask> findBacklogById(String id) {
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }
}
